import Image from 'next/image';

const SpaceNavContainer = function (): JSX.Element {
  return (
    <div className={'w-[250px]'}>
      <div>logo</div>
      <div>
        <div>
          <Image />
        </div>
        <div>sapce list</div>
        <div>toggle dark mode</div>
      </div>
    </div>
  );
};

export default SpaceNavContainer;
