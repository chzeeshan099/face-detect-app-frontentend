import { Title, Button } from 'rizzui';
import cn from '@/utils/class-names';
import { ForwardedRef, forwardRef } from 'react';
import Shadowimage from '@public/images/cardshadowimage.svg';
import ShadowRightimage from '@public/images/rightimage.svg';
import Shadowleftlightimage from '@public/images/lightleftimage.svg';
import ShadowLightimage from '@public/images/lightMode-shadow-right.svg';
import Image from 'next/image';
const widgetCardClasses = {
  base: 'dark:border border-muted shadow-sm border-white dark:border-greenPrimary-300 dark:border-greenPrimary-300 bg-lightgray-primary dark:bg-dashBordCardsBG ',
  rounded: {
    sm: 'rounded-sm',
    DEFAULT: 'rounded-lg',
    lg: 'rounded-xl',
    xl: 'rounded-2xl',
  },
  shadow:{}
};

type WidgetCardTypes = {
  title: React.ReactNode;
  description?: React.ReactNode;
  action?: React.ReactNode;
  rounded?: keyof typeof widgetCardClasses.rounded;
  headerClassName?: string;
  titleClassName?: string;
  actionClassName?: string;
  descriptionClassName?: string;
  className?: string;
  shadow?:any;
  button?: {
    text: any;
    onClick?: () => void;
    variant?: 'flat' | 'text' | 'solid' | 'outline';
    className?: string;
  };
};

function CustomWidgetCard(
  {
    title,
    action,
    description,
    rounded = 'DEFAULT',
    className,
    headerClassName,
    actionClassName,
    titleClassName,
    descriptionClassName,
    children,
    shadow="right",
    button
  }: React.PropsWithChildren<WidgetCardTypes>,
  ref: ForwardedRef<HTMLDivElement>
) {
  return (
    <div
      className={cn(
        widgetCardClasses.base,
        widgetCardClasses.rounded[rounded],
        className
      )}
      ref={ref}
    >
      <div
        className={cn(
          action && 'flex items-start justify-between  ',
          headerClassName
        )}
      >
        <div className="relative">
          {shadow === 'right' && (
            <div className="absolute right-0 top-0">
              <Image
          src={Shadowimage}
          alt="Shadow image"
          width={200}
          height={0}
          className="hidden rounded-md dark:block"
              />
              <Image
          src={ShadowLightimage}
          alt="Shadow image"
          width={200}
          height={0}
          className="block dark:hidden"
              />
            </div>
          )}
          {shadow === 'left' && (
            <div className="absolute left-0 top-0">
              <Image
          src={ShadowRightimage}
          alt="Shadow image"
          width={200}
          height={0}
          className="hidden rounded-md dark:block"
              />
              <Image
          src={Shadowleftlightimage}
          alt="Shadow image"
          width={200}
          height={0}
          className="block dark:hidden"
              />
            </div>
          )}
          <div className={cn(
            'flex items-center',
            button ? 'justify-between px-2' : 'justify-center px-0',
            'border-b border-white dark:border-greenPrimary-300 py-2 '
          )}>
            <Title
              className={cn(
                'text-base font-semibold text-blackk-light dark:text-white sm:text-lg',
                titleClassName
              )}
            >
              {title}
            </Title>
            {button && (
              <Button
              
                className={cn(
                  "bg-yellow-primary text-gray-950 text-sm font-bold transition-colors px-4 py-3 hover:!bg-yellow-primary",
                  button.className
                )}
                onClick={button.onClick}
                variant={button.variant as 'flat' | 'text' | 'solid' | 'outline'}
              >
                {button.text}
              </Button>
            )}
          </div>
          {description && (
            <div className={descriptionClassName}>{description}</div>
          )}
        </div>
        {action && <div className={cn('ps-2', actionClassName)}>{action}</div>}
      </div>
      {children}
    </div>
  );
}

export default forwardRef(CustomWidgetCard);
CustomWidgetCard.displayName = 'WidgetCard';
