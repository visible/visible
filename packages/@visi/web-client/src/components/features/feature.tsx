import React from 'react';

import { Image, Typography } from '../ui';

export interface FeatureProps {
  title: string;
  description: string;
  imageUrl: string;
  imageDescription: string;
}

export const Feature = ({
  title,
  description,
  imageUrl,
  imageDescription,
}: FeatureProps) => {
  return (
    <div className="flex flex-col p-4 items-center space-y-2 w-full md:w-1/3 flex-shrink-0 flex-grow">
      <div>
        <Image src={imageUrl} alt={imageDescription} width="100px" />
      </div>
      <div>
        <Typography variant="h3" fontSize="lg">
          {title}
        </Typography>
      </div>
      <div>
        <Typography variant="p" color="wash" align="center">
          {description}
        </Typography>
      </div>
    </div>
  );
};
