import { Tenant } from '@prisma/client';
import axios from 'axios';
import classNames from 'classnames';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import TenantDeleteModal from './modals/tenants/tenantDeleteModal';
import Button from './ui/button';

const headerTitles = [
    '',
    'id',
    'first_name',
    'last_name',
    'tel',
    'nationality',
];
const TenantsTable = () => {
    const [tenants, setTenants] = useState<Tenant[]>([]);
    const [tenantsChecked, setTenantsChecked] = useState<boolean[]>([]);
    const [allChecked, setAllChecked] = useState(false);
    const pathName = usePathname();
    useEffect(() => {
        const ac = new AbortController();
        axios
            .get('api/tenants')
            .then((res) => {
                setTenants(res.data);
            })
            .catch((e) => {
                console.log(e);
            });

        return () => {
            ac.abort();
        };
    }, []);

    useEffect(() => {
        if (tenants.length != 0) {
            setTenantsChecked(new Array(tenants.length).fill(false));
        }
    }, [tenants.length]);

    const handleTenantCheck = (checked: boolean, index: number) => {
        setTenantsChecked(
            tenantsChecked.map((_, i) => (i === index ? checked : _))
        );
    };

    const handleAllCheck = () => {
        setTenantsChecked(tenantsChecked.map(() => !allChecked));
        setAllChecked(!allChecked);
    };

    const tableRows = tenants.map((tenant: Tenant, index) => (
        <tr
            key={index}
            className={classNames({ 'bg-base-200': tenantsChecked[index] })}
        >
            <th scope='col'>
                <label>
                    <input
                        type='checkbox'
                        className='checkbox'
                        onChange={(event) =>
                            handleTenantCheck(
                                (event.target as HTMLInputElement).checked,
                                index
                            )
                        }
                        checked={tenantsChecked[index] ?? false}
                    />
                </label>
            </th>
            <td>
                <div className='avatar placeholder'>
                    <div className='bg-neutral text-neutral-content w-12 rounded-full'>
                        <span>
                            {tenant.first_name[0]}
                            {tenant.last_name[0]}
                        </span>
                    </div>
                </div>
            </td>
            <td>
                <Link
                    className='link link-primary'
                    href={`${pathName}/${tenant.id}`}
                >
                    {tenant.id}
                </Link>
            </td>
            <td>{tenant.first_name}</td>
            <td>{tenant.last_name}</td>
            <td>{tenant.tel}</td>
            <td>{tenant.nationality}</td>
        </tr>
    ));

    const handleTenantDelete = (index: number) => {
        // alert('are you sure you want to delete this tenant?');
        tenantDeleteModalRef.current?.showModal();
    };
    const tableHeader = (
        <tr>
            <th>
                <label>
                    <input
                        type='checkbox'
                        className='checkbox'
                        onInput={handleAllCheck}
                    />
                </label>
            </th>

            {tenantsChecked.filter((val) => val === true).length > 0
                ? headerTitles.map((header, index) =>
                      index === 0 ? (
                          <th key={`delete-${index}`}>
                              <Button
                                  neutral
                                  responsive={false}
                                  onClick={handleTenantDelete}
                              >
                                  Delete Selected
                              </Button>
                          </th>
                      ) : (
                          <th key={`empty-${index}`}></th>
                      )
                  )
                : headerTitles.map((header, index) => (
                      <th key={index}>{header}</th>
                  ))}
        </tr>
    );

    const tenantDeleteModalRef = useRef<HTMLDialogElement>(null);

    return (
        <div className='overflow-y-auto'>
            <table className='table table-lg table-pin-rows'>
                {/* head */}
                <thead className='w-full'>{tableHeader}</thead>
                <tbody>{tableRows}</tbody>
                {/* foot */}
                {/* <tfoot>
                    <tr>
                        <th></th>
                        <th>Name</th>
                        <th>Job</th>
                        <th>Favorite Color</th>
                        <th></th>
                    </tr>
                </tfoot> */}
            </table>
            <TenantDeleteModal
                ref={tenantDeleteModalRef}
                tenants={tenants}
                tenantsChecked={tenantsChecked}
            />
        </div>
    );
};

export default TenantsTable;
