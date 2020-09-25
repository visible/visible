import { NextPage } from 'next';
import { NextSeo } from 'next-seo';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import ReactGA from 'react-ga';

import { Hidden, Image, Layout, Search, Typography } from '../components/ui';
import { useCreateDiagnosisMutation } from '../generated/graphql';
import { useTranslation } from '../utils/i18next';
import { withApollo } from '../utils/with-apollo';

const Index: NextPage = () => {
  const { t } = useTranslation();
  const [value, setValue] = useState('');
  const router = useRouter();

  const [
    createDiagnosis,
    { data, error, loading },
  ] = useCreateDiagnosisMutation({
    variables: {
      url: value,
    },
  });

  useEffect(() => {
    if (data) {
      router.push(
        '/diagnoses/[diagnosis_id]',
        `/diagnoses/${data.createDiagnosis.id}`,
      );
    }
  }, [data, router]);

  useEffect(() => {
    router.prefetch('/diagnoses/[diagnosis_id]');
  }, [router]);

  const handleSubmit = () => {
    ReactGA.event({
      category: 'diagnoses',
      action: 'create',
      label: value,
    });

    createDiagnosis();
  };

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
          style={{
            backgroundImage: `url("/static/wave.png")`,
            backgroundSize: 'cover',
            backgroundPosition: 'bottom',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            width: '100%',
            height: '380px',
            paddingBottom: '100px',
          }}
        >
          <Layout.Container>
            <div className="space-y-4">
              <div>
                <Typography variant="h2" color="invert">
                  {title}
                </Typography>
              </div>

              <Search
                type="url"
                placeholder={t('home.placeholder', 'Type URL of the website')}
                onChange={(v: string) => void setValue(v)}
                onSubmit={handleSubmit}
                disabled={loading}
                required
              >
                {t('home.submit', 'Diagnose')}
              </Search>

              <div>
                {error && (
                  <Typography fontStyle="italic" color="invert">
                    {error.message}
                  </Typography>
                )}

                <Typography color="invert">{description}</Typography>
              </div>
            </div>
          </Layout.Container>
        </div>

        <Layout.Container>
          <Hidden>
            <Typography variant="h2">
              {t('home.introduction', 'Introduction')}
            </Typography>
          </Hidden>

          <div className="space-y-12">
            <div className="flex justify-between">
              <div className="flex-1">
                <Typography variant="h3" fontSize="2xl">
                  {t('home.agenda.title', 'Less pain, more accessible')}
                </Typography>

                <Typography variant="p">
                  {t(
                    'home.agenda.description',
                    `Visible is not just a linter, we also provide information on how to make your website accessible. We indicate which part you need to fix, give you patches of codes, give you references to the standards — to help you to learn and improve the accessibility of your website.`,
                  )}
                </Typography>
              </div>

              <div>
                <Image
                  src="/static/books.png"
                  alt={t('home.agenda.image', 'Book')}
                  width="160px"
                />
              </div>
            </div>

            <Hidden>
              <Typography variant="h2">
                {t('home.features.title', 'Features')}
              </Typography>
            </Hidden>

            <div className="flex space-x-4 justify-between">
              <div className="flex-1 flex flex-col items-center space-y-4">
                <div>
                  <Image src="/static/robot.png" alt="Robot" width="100px" />
                </div>
                <div>
                  <Typography variant="h3" fontSize="lg">
                    {t('home.features.automation.title', 'Automation')}
                  </Typography>
                </div>
                <div>
                  <Typography variant="p" color="wash" align="center">
                    {t(
                      'home.features.automation.description',
                      `Unlike other tools, Visible also provides patches to fix the a11y issues so you don’t need to search for information of the error and helps you to focus more on coding`,
                    )}
                  </Typography>
                </div>
              </div>

              <div className="flex-1 flex flex-col items-center space-y-4">
                <div>
                  <Image
                    src="/static/contract.png"
                    alt="Documentation"
                    width="100px"
                  />
                </div>
                <div>
                  <Typography variant="h3" fontSize="lg">
                    {t('home.features.learn.title', 'Learn about A11y')}
                  </Typography>
                </div>
                <div>
                  <Typography variant="p" color="wash" align="center">
                    {t(
                      'home.features.learn.description',
                      `Visible always inform you which exact codes are violating rules which means you can learn more about accessibility as you code`,
                    )}
                  </Typography>
                </div>
              </div>

              <div className="flex-1 flex flex-col items-center space-y-4">
                <div>
                  <Image src="/static/cog.png" alt="Cog" width="100px" />
                </div>
                <div>
                  <Typography variant="h3" fontSize="lg">
                    {t('home.features.ci.title', 'Continuous Integration')}
                  </Typography>
                </div>
                <div>
                  <Typography variant="p" color="wash" align="center">
                    {t(
                      'home.features.ci.description',
                      `Visible is also available on command-line, so you can use it on continuous integrations services and monitor the website is fine.`,
                    )}
                  </Typography>
                </div>
              </div>
            </div>

            <div>
              <Typography variant="h2" fontSize="2xl">
                Who creates Visible?
              </Typography>

              <Typography variant="p">
                Visible is developed by a high schooler Ryō Igarashi for groping
                and enhancing the possibility of Web and assistive technology
                since December 2019. As of May 2020, Visible was accepted by
                Mitou Foundation as a project of Mitou Junior and is receiving
                technical/financial supports.
              </Typography>
            </div>

            <div>
              <div className="flex">
                <div className="flex-1">
                  <Typography variant="h2" fontSize="2xl">
                    {t('home.features.beta.title', 'Try the beta out, now!')}
                  </Typography>

                  <Typography variant="p">
                    {t(
                      'home.features.beta.description',
                      "We are working hard to release Visible by November this year. In case if you interested in Visible or accessibility, I'd appreciate you trying it out. Please keep it in mind that the programme is still under development and not guaranteed to work properly.",
                    )}
                  </Typography>
                </div>

                <div>
                  <Image
                    src="/static/beta.png"
                    alt="A button labeled `beta`"
                    width="160px"
                  />
                </div>
              </div>
            </div>
          </div>
        </Layout.Container>
      </Layout.Content>
    </Layout.Main>
  );
};

Index.getInitialProps = async () => ({
  namespacesRequired: ['web-client'],
});

export default withApollo({ ssr: true })(Index);
