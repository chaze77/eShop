import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { Col, Form, Input, Row, Switch, Typography } from 'antd';
import TextArea from 'antd/es/input/TextArea';

import TopButtons from './components/TopButtons';
import showDeleteModal from '@/components/ui/Modal/ShowModal';
import { ConfigRoutes } from '@/constants/page-routes';
import useBannerStore from '@/store/useBannerStore';
import { buildBannerPayload } from './helper/buildPayload';
import { MESSAGES } from '@/constants/messages';

import InputFileUpload from '@/components/ui/InputFileUpload/InputFileUpload';
import NativeColorPicker from './components/ColorPicker';
import Loader from '@/components/ui/Loader/Loader';

const { Title } = Typography;

type BannerFormValues = {
  title: string;
  subTitle?: string;
  imageDesktop: string | File;
  imageMobile: string | File;
  textColor: string;
  colorOverlay: string;
  active?: boolean;
};

const BannerDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [createMode, setCreateMode] = useState<boolean>(!id);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [form] = Form.useForm<BannerFormValues>();

  const deleteItem = useBannerStore((state) => state.delete);
  const create = useBannerStore((state) => state.create);
  const update = useBannerStore((state) => state.update);
  const getById = useBannerStore((state) => state.getById);
  const banner = useBannerStore((state) => state.banner);
  const [isHexValid, setIsHexValid] = useState(true);

  useEffect(() => {
    if (id) {
      getById(id);
      setCreateMode(false);
    } else {
      setCreateMode(true);
      form.resetFields();
    }
  }, [id, getById, form]);

  useEffect(() => {
    if (banner && id) {
      form.setFieldsValue({
        title: banner.title || '',
        subTitle: banner.subTitle || '',
        imageDesktop: banner.imageDesktop || '',
        imageMobile: banner.imageMobile || '',
        textColor: banner.textColor || '#000000',
        colorOverlay: banner.colorOverlay || '#000000',
        active: banner?.active ?? true,
      });
    }
  }, [banner, id, form]);

  const handleCreate = async (values: BannerFormValues) => {
    setIsLoading(true);
    const payload = await buildBannerPayload(values, 'create');
    await create(payload).finally(() => setIsLoading(false));
    navigate(ConfigRoutes.BANNERS);
  };

  const handleUpdate = async (values: BannerFormValues) => {
    if (id) {
      setIsLoading(true);
      const payload = await buildBannerPayload(values, 'update');

      await update(id, payload).finally(() => setIsLoading(false));
    }
    navigate(ConfigRoutes.BANNERS);
  };

  const handleDelete = async () => {
    if (id) await deleteItem(id);
    navigate(ConfigRoutes.BANNERS);
  };

  const openDeleteModal = () => {
    showDeleteModal({
      type: 'deleteModal',
      onConfirm: handleDelete,
    });
  };

  const initialValues: BannerFormValues = {
    title: '',
    subTitle: '',
    imageDesktop: '',
    imageMobile: '',
    textColor: '#000000',
    colorOverlay: '#000000',
    active: true,
  };

  return (
    <div className='content-box'>
      <Title
        level={2}
        style={{ marginBottom: 24 }}
      >
        Banner Details
      </Title>

      {isLoading ? (
        <Loader show={isLoading} />
      ) : (
        <Form
          form={form}
          layout='vertical'
          onFinish={createMode ? handleCreate : handleUpdate}
          initialValues={initialValues}
        >
          <TopButtons
            createMode={createMode}
            close={() => navigate(-1)}
            openDeleteModal={openDeleteModal}
            isHexValid={isHexValid}
          />

          <Row gutter={[16, 16]}>
            <Col xs={24}>
              <Form.Item
                label='Title'
                name='title'
                rules={[
                  { required: true, message: MESSAGES.validation.emptyName },
                  { min: 3, message: MESSAGES.validation.nameMin },
                ]}
              >
                <Input placeholder='Banner title' />
              </Form.Item>
            </Col>

            <Col xs={24}>
              <Form.Item
                label='SubTitle'
                name='subTitle'
                rules={[
                  { required: true, message: MESSAGES.validation.emptyName },
                  { min: 3, message: MESSAGES.validation.nameMin },
                ]}
              >
                <TextArea
                  placeholder='Banner subtitle'
                  rows={5}
                />
              </Form.Item>
            </Col>

            <Col
              xs={24}
              md={12}
            >
              <Form.Item
                label='Text Color'
                name='textColor'
              >
                <NativeColorPicker checkIsValidHex={setIsHexValid} />
              </Form.Item>
            </Col>

            <Col
              xs={24}
              md={12}
            >
              <Form.Item
                label='Overlay Color'
                name='colorOverlay'
              >
                <NativeColorPicker checkIsValidHex={setIsHexValid} />
              </Form.Item>
            </Col>

            <Col
              xs={24}
              md={12}
            >
              <Form.Item
                label='Image Desktop'
                name='imageDesktop'
              >
                <InputFileUpload />
              </Form.Item>
            </Col>

            <Col
              xs={24}
              md={12}
            >
              <Form.Item
                label='Image Mobile'
                name='imageMobile'
              >
                <InputFileUpload />
              </Form.Item>
            </Col>
            <Form.Item
              label='oFF/oN'
              name='active'
              valuePropName='checked'
            >
              <Switch />
            </Form.Item>
          </Row>
        </Form>
      )}
    </div>
  );
};

export default BannerDetails;
