import ReferenceTable from '@/components/Reference/ReferenceTable';
import { LABELS } from '@/contstants/labels';
import useColorStore from '@/store/useColorStore';

const Colors = () => {
  return (
    <ReferenceTable
      store={useColorStore}
      title={LABELS.pages.colors}
    />
  );
};

export default Colors;
