import { FC } from 'react';
import ButtonPrimary from '../misc/ButtonPrimary';

interface Props {
  onReset: () => void;
}

export const ResetChat: FC<Props> = ({ onReset }) => {
  return (
    <div className="mt-10">
      <ButtonPrimary onClick={() => onReset()}>Reset</ButtonPrimary>
    </div>
  );
};
