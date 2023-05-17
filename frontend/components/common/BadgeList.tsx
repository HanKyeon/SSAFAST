import { DOMAttributes } from 'react';
import { PresenceUserData } from '../work/presence-type';
import Badge from './Badge';

interface UserPresenceOne {
  id: number | string;
  presence: PresenceUserData;
}

interface BadgeProps extends DOMAttributes<HTMLDivElement> {
  className?: string;
  users?: UserPresenceOne[];
}

const HorizonBadgeList = function ({
  className,
  users = [],
  ...rest
}: BadgeProps) {
  return (
    <div className={`${className}`}>
      {users.map((user) => {
        return (
          <Badge
            name={user.presence.name}
            image={user.presence.img}
            key={`${user.id}-horizon-badge`}
          />
        );
      })}
    </div>
  );
};

const VerticalBadgeList = function ({
  className,
  users = [],
  ...rest
}: BadgeProps) {
  return (
    <div className={`${className}`}>
      {users.map((user) => {
        return (
          <Badge
            name={user.presence.name}
            image={user.presence.img}
            key={`${user.id}-vertical-badge`}
          />
        );
      })}
    </div>
  );
};

export { HorizonBadgeList, VerticalBadgeList };
