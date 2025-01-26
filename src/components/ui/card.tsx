import classNames from 'classnames';
import Image from 'next/image';

interface CardProps {
    children?: React.ReactNode;
    type?: 'primary' | 'neutral';
    imgUrl?: string;
}

const Card = ({ imgUrl, children, type = 'neutral' }: CardProps) => {
    return (
        <div
            className={classNames(
                'card lg:card-normal md:card-normal sm:card-compact image-full',
                { 'bg-primary text-primary-content': type === 'primary' },
                { 'bg-neutral text-neutral-content': type === 'neutral' }
            )}
        >
            {imgUrl && (
                <figure>
                    <Image
                        src={imgUrl}
                        alt='Img not found'
                        width={180}
                        height={150}
                    />
                </figure>
            )}
            <div
                className={classNames(
                    'card-body child:flex child:justify-between'
                )}
            >
                {children}
            </div>
        </div>
    );
};

export default Card;
