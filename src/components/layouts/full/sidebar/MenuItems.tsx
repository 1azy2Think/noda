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
  buttons?: string[]; // Changed from any[] to string[] for clarity
  collapsible?: boolean; // Add this for collapsible sections
  onprogress?: boolean;
};

export default function useMenuItems(): MenuItemType[] {
  const { t } = useTranslation();

  return [
    { 
      navlabel: true, 
      collapsible: false 
    },
    { title: t('nav.dashboard'), icon: TbLayoutDashboard, href: '/dashboard', onprogress: true },
    { title: t('nav.storage'), icon: TbDatabase, href: '/storage', onprogress: true},
    { title: t('nav.explore'), icon: TbSearch, href: '/explore', onprogress: true},
    { title: t('nav.gpt'), icon: TbRobot, href: '/gpt', onprogress: true},

    { 
      navlabel: true, 
      subheader: t('nav.myDocs'), 
      buttons: ["add","refresh"], 
      collapsible: true,
      onprogress: true
    },
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

    { 
      navlabel: true, 
      subheader: t('nav.recent'), 
      buttons: ["refresh"], 
      collapsible: true 
    },
    { title: t('nav.recentDoc') + ' 1', icon: TbFileText, href: '' },
    { title: t('nav.recentDoc') + ' 2', icon: TbFileText, href: '' },
  ];
}