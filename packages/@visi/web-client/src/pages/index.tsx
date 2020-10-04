import { NextPage } from 'next';
import { NextSeo } from 'next-seo';
import React from 'react';

import { Features } from '../components/features';
import { Imprint } from '../components/imprint';
import { Newsletter } from '../components/newsletter';
import { Synopsis } from '../components/synopsis';
import { Hidden, Layout, Typography } from '../components/ui';
import { Wizard } from '../components/wizard';
import { useTranslation } from '../utils/i18next';
import { withApollo } from '../utils/with-apollo';

const Index: NextPage = () => {
  const { t } = useTranslation();

  const title = t('home.title', 'Is your website visible?');
  const description = t(
    'home.description',
    'Visible is a tool-chain that helps developers to build websites in the perspective of accessibility',
  );

  return (
    <Layout.Main>
      <NextSeo
        title={title}
        description={description}
        openGraph={{ title, description }}
      />

      <Layout.Content>
        <div
          className="pb-40 pt-10"
          style={{
            backgroundImage: `url("/static/wave.png")`,
            backgroundSize: 'cover',
            backgroundPosition: 'bottom',
          }}
        >
          <Layout.Container>
            <Wizard />
          </Layout.Container>
        </div>

        <Hidden>
          <Typography variant="h2">
            {t('home.introduction', 'Introduction')}
          </Typography>
        </Hidden>

        <Layout.Container className="pb-12">
          <Synopsis />
        </Layout.Container>

        <div className="bg-gray-100 py-12">
          <Layout.Container>
            <Features />
          </Layout.Container>
        </div>

        <div className="py-12">
          <Layout.Container>
            <Imprint />
          </Layout.Container>
        </div>

        <div className="bg-gray-100 py-12">
          <Layout.Container>
            <Newsletter withImage />
          </Layout.Container>
        </div>
      </Layout.Content>
    </Layout.Main>
  );
};

Index.getInitialProps = async () => ({
  namespacesRequired: ['web-client'],
});

export default withApollo({ ssr: true })(Index);
