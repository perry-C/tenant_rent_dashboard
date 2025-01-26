import { Tenant } from '@prisma/client';
import axios from 'axios';

interface TenantDeleteModalProps {
    tenants: Tenant[];
    tenantsChecked: boolean[];
    ref: React.RefObject<HTMLDialogElement>;
}

const TenantDeleteModal = ({
    tenants,
    tenantsChecked,
    ref,
}: TenantDeleteModalProps) => {
    const handleDeleteTenant = () => {
        const deleteTenantIds = tenants
            .filter((_, index) => tenantsChecked[index] == true)
            .map((val) => val.id);

        let promises: Promise<any>[] = [];
        deleteTenantIds.forEach((val) => {
            promises.push(axios.delete(`/api/tenants/${val}`));
        });

        Promise.all(promises)
            .then(() => console.log('All Deleted!'))
            .catch((err) => console.log(err));

        window.location.reload();
    };

    return (
        <dialog id='my_modal_1' className='modal' ref={ref}>
            <div className='modal-box'>
                <h3 className='font-bold text-lg'>Caution!</h3>
                <p className='py-4'>
                    Are you sure you want to DELETE the selected tenant(s)?
                </p>
                <div className='modal-action'>
                    <form method='dialog' className='space-x-2'>
                        {/* if there is a button in form, it will close the modal */}
                        <button
                            className='btn btn-error'
                            onClick={handleDeleteTenant}
                        >
                            Delete
                        </button>
                        <button className='btn'>Close</button>
                    </form>
                </div>
            </div>
        </dialog>
    );
};

export default TenantDeleteModal;
