import ReferenceTable from '@/components/Reference/ReferenceTable';
import useSizeStore from '@/store/useSizeStore';

const Sizes = () => {
  return (
    <ReferenceTable
      store={useSizeStore}
      title='Size'
    />
  );
};

export default Sizes;
