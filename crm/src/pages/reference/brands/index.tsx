import ReferenceTable from '@/components/Reference/ReferenceTable';
import useBrandStore from '@/store/useBrandStore';

const Brands = () => {
  return (
    <ReferenceTable
      store={useBrandStore}
      title='Бренд'
    />
  );
};

export default Brands;
