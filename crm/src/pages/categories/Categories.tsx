import ReferenceTable from '@/components/Reference/ReferenceTable';
import useCategoryStore from '@/store/useCategoryStore';

const Categories = () => {
  return (
    <ReferenceTable
      store={useCategoryStore}
      title='Категории'
    />
  );
};

export default Categories;
