import './test.less';

type BlockItem = {
  id: string;
  title: string;
  icon: string;
  visible: boolean;
};

type Block = {
  id: string;
  title: string;
  section: 'top' | 'middle' | 'bottom';
  type?: 'default' | 'twoColumn';
  items: BlockItem[];
};

export const TestPage = () => {
  const blocks: Block[] = [
    {
      id: 'deposits',
      title: 'Deposits',
      section: 'top',
      items: [
        { id: 'dep-1', title: 'Open deposit', icon: '💰', visible: false },
        { id: 'dep-2', title: 'My deposits', icon: '📊', visible: false },
        {
          id: 'dep-3',
          title: 'Deposit calculator',
          icon: '🧮',
          visible: false,
        },
      ],
    },
    {
      id: 'credits',
      title: 'Credits',
      section: 'top',
      items: [
        { id: 'cred-1', title: 'Apply for credit', icon: '💳', visible: false },
        { id: 'cred-2', title: 'My credits', icon: '📄', visible: false },
        { id: 'cred-3', title: 'Credit history', icon: '📈', visible: false },
      ],
    },
    {
      id: 'accounting',
      title: 'Accounting',
      section: 'top',
      items: [
        { id: 'acc-1', title: 'Invoices', icon: '🧾', visible: true },
        { id: 'acc-2', title: 'Acts', icon: '📁', visible: true },
        { id: 'acc-3', title: 'Reconciliation', icon: '📘', visible: true },
      ],
    },
    {
      id: 'taxes',
      title: 'My taxes',
      section: 'middle',
      items: [
        { id: 'tax-1', title: 'Pay taxes', icon: '🧾', visible: true },
        { id: 'tax-2', title: 'Tax reports', icon: '📑', visible: true },
        { id: 'tax-3', title: 'Tax debts', icon: '⚠️', visible: true },
      ],
    },
    {
      id: 'business',
      title: 'Business services',
      section: 'middle',
      items: [
        { id: 'biz-1', title: 'Counterparties', icon: '👔', visible: true },
        { id: 'biz-2', title: 'Documents', icon: '📄', visible: true },
        { id: 'biz-3', title: 'Templates', icon: '🗂️', visible: true },
      ],
    },
    {
      id: 'atm',
      title: 'ATMs and cash desks',
      section: 'bottom',
      items: [
        { id: 'atm-1', title: 'Find ATM', icon: '🏧', visible: true },
        { id: 'atm-2', title: 'Cash desks', icon: '🏦', visible: true },
        { id: 'atm-3', title: 'Nearest locations', icon: '📍', visible: true },
      ],
    },
    {
      id: 'sales',
      title: 'Increased sales',
      section: 'bottom',
      items: [
        { id: 'sales-1', title: 'Promotions', icon: '🔥', visible: true },
        { id: 'sales-2', title: 'Analytics', icon: '📊', visible: true },
        { id: 'sales-3', title: 'Customer base', icon: '👥', visible: false },
      ],
    },
  ];

  const hasVisibleItems = (block: Block) =>
    block.items.some((item) => item.visible);

  const visibleBlocks = blocks.filter(hasVisibleItems);

  const initialTop = visibleBlocks.filter((block) => block.section === 'top');
  const initialMiddle = visibleBlocks.filter(
    (block) => block.section === 'middle',
  );
  const bottomBlocks = visibleBlocks.filter(
    (block) => block.section === 'bottom',
  );

  const shouldMoveMiddleToTop = initialMiddle.length < 2;

  const topBlocks = shouldMoveMiddleToTop
    ? [...initialTop, ...initialMiddle].map((block) => ({
        ...block,
        type: 'default' as const,
      }))
    : initialTop.map((block) => ({
        ...block,
        type: 'default' as const,
      }));

  const middleBlocks = shouldMoveMiddleToTop
    ? []
    : initialMiddle.map((block, index) => ({
        ...block,
        type: index === 1 ? ('twoColumn' as const) : ('default' as const),
      }));

  const getSectionColumnsClass = (count: number, maxColumns: 1 | 2 | 3) => {
    if (count <= 1) return 'services-section--one';
    if (count === 2) return 'services-section--two';
    if (maxColumns === 3 && count >= 3) return 'services-section--three';
    return 'services-section--two';
  };

  const renderBlock = (block: Block) => {
    const visibleItems = block.items.filter((item) => item.visible);

    if (visibleItems.length === 0) {
      return null;
    }

    return (
      <div
        key={block.id}
        className={`block ${block.type === 'twoColumn' ? 'block-twoColumn' : ''}`}
      >
        <h2 className='block-title'>{block.title}</h2>

        <div className='block-items'>
          {visibleItems.map((item) => (
            <div
              key={item.id}
              className='block-item'
            >
              <div className='block-item-icon'>{item.icon}</div>
              <div className='block-item-title'>{item.title}</div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className='main-container'>
      <h1>Test Page</h1>

      <div className='services-layout'>
        {topBlocks.length > 0 && (
          <div
            className={`services-section services-section-top ${getSectionColumnsClass(
              topBlocks.length,
              3,
            )}`}
          >
            {topBlocks.map(renderBlock)}
          </div>
        )}

        {middleBlocks.length > 0 && (
          <div className='services-section services-section-middle services-section-middle--special'>
            {middleBlocks.map(renderBlock)}
          </div>
        )}

        {bottomBlocks.length > 0 && (
          <div
            className={`services-section services-section-bottom ${getSectionColumnsClass(
              bottomBlocks.length,
              2,
            )}`}
          >
            {bottomBlocks.map(renderBlock)}
          </div>
        )}
      </div>
    </div>
  );
};
