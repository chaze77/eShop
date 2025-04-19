import ReferenceTable from '@/components/Reference/ReferenceTable';
import useTagStore from '@/store/useTagsStore';

export default function Tags() {
  return (
    <ReferenceTable
      store={useTagStore}
      title='Тэги'
    />
  );
}
