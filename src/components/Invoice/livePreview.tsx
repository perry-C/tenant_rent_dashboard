import { InvoiceType } from '@/types';
import InvoiceTemplate from './invoiceTemplate';

type LivePreviewProps = {
    data: InvoiceType;
};

const LivePreview = ({ data }: LivePreviewProps) => {
    return <InvoiceTemplate {...data} />;
};

export default LivePreview;
