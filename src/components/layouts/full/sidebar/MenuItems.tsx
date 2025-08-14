import {
  TbFolder, TbLayoutDashboard, TbFileText, TbDatabase, TbSearch, TbRobot
} from 'react-icons/tb';
import { type IconType } from 'react-icons';
import { useTranslation } from 'react-i18next';

export type MenuItemType = {
  navlabel?: boolean;
  subheader?: string;
  title?: string;
  icon?: IconType;
  href?: string;
  external?: boolean;
  disabled?: boolean;
  children?: MenuItemType[];
};

export default function useMenuItems(): MenuItemType[] {
  const { t } = useTranslation();

  return [
    { title: t('nav.dashboard'), icon: TbLayoutDashboard, href: '/dashboard' },
    { title: t('nav.storage'), icon: TbDatabase, href: '/storage' },
    { title: t('nav.explore'), icon: TbSearch, href: '/explore' },
    { title: t('nav.gpt'), icon: TbRobot, href: '/gpt' },

    { navlabel: true, subheader: t('nav.myDocs'), children: [] },
    {
      title: t('nav.folder') + ' 1',
      icon: TbFolder,
      href: '',
      children: [
        {
          title: t('nav.doc') + ' 1',
          icon: TbFileText,
          href: '',
          children: [
            { title: t('nav.doc') + ' 1.1', icon: TbFileText, href: '' },
            { title: t('nav.doc') + ' 1.2', icon: TbFileText, href: '' }
          ]
        },
        { title: t('nav.doc') + ' 2', icon: TbFileText, href: '' }
      ]
    },
    { title: t('nav.folder') + ' 2', icon: TbFileText, href: '' },
    { title: t('nav.folder') + ' 3', icon: TbFileText, href: '' },
  ];
}
