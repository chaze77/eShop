import ReferenceTable from '@/components/Reference/ReferenceTable';
import { LABELS } from '@/constants/labels';
import useCategoryStore from '@/store/useCategoryStore';

const Categories = () => {
  return (
    <ReferenceTable
      key={LABELS.fields.category}
      store={useCategoryStore}
      title={LABELS.fields.category}
    />
  );
};

export default Categories;
