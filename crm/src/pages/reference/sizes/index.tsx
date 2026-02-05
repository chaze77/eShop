import ReferenceTable from '@/components/Reference/ReferenceTable';
import { LABELS } from '@/contstants/labels';
import useSizeStore from '@/store/useSizeStore';

const Sizes = () => {
  return (
    <ReferenceTable
      store={useSizeStore}
      title={LABELS.pages.sizes}
    />
  );
};

export default Sizes;
