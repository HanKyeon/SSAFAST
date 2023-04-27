import Image from 'next/image';
// import UserImg from '@/assets/images/Ggo.png';
import UserImg from '/public/assets/images/Ggo.png';
import { Box } from '../common';

const SpaceNavContainer = function (): JSX.Element {
  return (
    <div className="w-[250px] mr-5">
      <div>
        <Image src={UserImg} alt="logo" height={70} />
      </div>
      <Box className="mt-5">
        <div>
          <Image src={UserImg} alt="user image" width={150} height={150} />
          <div>sapce list</div>
          <div>toggle dark mode</div>
        </div>
      </Box>
    </div>
  );
};

export default SpaceNavContainer;
