import ReferenceTable from '@/components/Reference/ReferenceTable';
import { LABELS } from '@/contstants/labels';
import useBrandStore from '@/store/useBrandStore';

const Brands = () => {
  return (
    <ReferenceTable
      store={useBrandStore}
      title={LABELS.pages.brands}
    />
  );
};

export default Brands;
