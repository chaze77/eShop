import ReferenceTable from '@/components/Reference/ReferenceTable';
import { LABELS } from '@/contstants/labels';
import useTagStore from '@/store/useTagsStore';

export default function Tags() {
  return (
    <ReferenceTable
      store={useTagStore}
      title={LABELS.pages.tags}
    />
  );
}
