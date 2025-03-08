import ReferenceTable from '@/components/Reference/ReferenceTable';
import useColorStore from '@/store/useColorStore';

const Colors = () => {
  return (
    <ReferenceTable
      store={useColorStore}
      title='Colors'
    />
  );
};

export default Colors;
