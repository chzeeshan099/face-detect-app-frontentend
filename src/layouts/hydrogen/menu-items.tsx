import People from '@/components/moneyMuttImages/moneyMuttSideBar/people';
import ApiCommunity from '@/components/moneyMuttImages/moneyMuttSideBar/apiCommunity';
import Integration from '@/components/moneyMuttImages/moneyMuttSideBar/integration';
import Setting from '@/components/moneyMuttImages/moneyMuttSideBar/setting';
import Documentation from '@/components/moneyMuttImages/moneyMuttSideBar/documentation';
import { routes } from '@/config/routes';
import { MenuItem } from '@/types';
import { TbLayoutDashboard,  TbTool,  TbUsers, } from "react-icons/tb";
import { TbChartHistogram, TbDog, TbHomeDot,TbLoader3, TbMoneybag, TbShoppingCartCheck, TbTagStarred, TbUserScan, TbUsersGroup } from "react-icons/tb";
import { PiCalculator, PiClipboardTextLight, PiTagSimpleLight } from 'react-icons/pi';
import { LuLayoutDashboard, LuLoader } from 'react-icons/lu';
import { IoClipboardOutline } from 'react-icons/io5';
// import { TbChartBarPopular } from "react-icons/tb";
import { GoQuestion } from 'react-icons/go';
import { BsBarChart } from 'react-icons/bs';
import { IoMdSettings } from 'react-icons/io';




// export const menuItems = [
//   {
//     name: 'MANAGE',
//   },
//   {
//     icon: <People />,
//     name: 'Assistants',
//     href: '#',
//   },
//   {
//     icon: <Integration />,
//     name: 'Audiences',
//     href: routes.MoneyMutt.product,
//   },
//   {
//     icon: <Setting />,
//     name: 'Company Settings',
//     href: '#',
//     dropdownItems: [
//       {
//         name: 'Company Details',
//         href: routes.MoneyMutt.companyDetails,
//         badge: '',
//       },
//       {
//         name: 'Team ',
//         href: routes.MoneyMutt.team,
//       },
//       {
//         name: 'billing',
//         href: '/dashboard/profile-settings/billing',
//       },
//     ],
//   },
//   {
//     icon: <Documentation />,
//     name: 'Documentation',
//     href: '#',
//   },
//   {
//     icon: <ApiCommunity />,
//     name: 'API Community',
//     href: '#',
//   },
// ];


export const MenuItems: MenuItem[] = [
  {
    icon: <TbDog />    ,
    name: 'Doghouse',
    href: routes.moneyMutt.Doghouse,
    resource: 'Doghouse',
    actions: 'Doghouse.read',
    type: "public"
  },
  {
    icon: <PiCalculator />,
    name: 'Muttmeter',
    href: routes.moneyMutt.Muttmeter,
    resource: 'Muttmeter',
    actions: 'Muttmeter.read',
    type: "public"
  },

  
  {
    icon: <TbMoneybag />,
    name: 'Fetch & Earn',
    href: routes.moneyMutt.Fetch_Earn,
    resource: 'Fetch_&_Earn',
    actions: 'Fetch.read',
    type: "public"
  },
  {
    icon: <TbTagStarred />,
    name: 'Dog Tags',
    href: routes.moneyMutt.Dog_Tags,
    resource: 'Dog_Tags',
    actions: 'Dog_Tags.read',
    type: "public"
  },
  {
    icon: <LuLoader />,
    name: 'Alpha Barks',
    href: routes.moneyMutt.Alpha_Barks,
    resource: 'Alpha_Barks',
    actions: 'Alpha_Barks.read',
    type: "public"
  },
  {
    icon: <IoClipboardOutline  />,
    name: 'Ecosystem',
    href: '#',
    resource: 'Ecosystem',
    dropdownItems: [
      {
        icon:<PiClipboardTextLight/>,
        name: 'Governance',
        href: routes.moneyMutt.Governance,
        resource: 'Governance',
      },
    ]
  },
  {
    icon: <TbUsersGroup  />,
    name: 'Community',
    href: '#',
    resource: 'Community',
    dropdownItems: [
      {
        icon:<TbUserScan />,
        name: '$Mutt Army Hub',
        href: routes.moneyMutt.MuttArmyHub,
        resource: 'Mutt_Army_Hub',
        
       
      },
    ]
  },
  {
    icon: <PiTagSimpleLight  />,
    name: 'Tokenomics',
    href: '#',
    resource: 'Tokenomics',
    dropdownItems: [
      {
        icon:<TbChartHistogram />,
        name: 'Burn Tracker',
        href: routes.moneyMutt.BurnTracker,
        resource: 'Burn_Tracker',
       
      },

    ]
  },
  {
    icon: <BsBarChart   />,
    name: 'Top Dogs',
    href: routes.moneyMutt.Top_Dogs,
    resource: 'Top_Dogs',
    actions: 'Top_Dogs.read',
    type: "public"
  },
  {
    icon: <ApiCommunity />,
    name: '$Mutt Trail',
    href: routes.moneyMutt.Mutt_Trail,
    resource: '$Mutt_Trail',
    actions: '$Mutt_Trail.read',
    type: "public"
  },
  {
    icon: <TbHomeDot  />,
    name: 'My Kennel',
    href: routes.moneyMutt.My_Kennel,
    resource: 'My_Kennel',
    actions: 'My_Kennel.read',
    type: "public"
  },
  {
    icon: <GoQuestion  />,
    name: 'Help',
    href: routes.moneyMutt.Help,
    resource: 'Help',
    actions: 'Help.read',
    type: "public"
  },
];
export const AdminMenuItems: MenuItem[] = [
  {
    icon: <LuLayoutDashboard  />    ,
    name: 'Dashboard',
    href: routes.moneyMutt.Dashboard,
    resource: 'Dashboard',
    actions: 'Dashboard.read',
    type: "public"
  },
 
  {
    icon: <TbUsers />   ,
    name: 'User',
    href: routes.moneyMutt.User,
    resource: 'User',
    actions: 'User.read',
    type: "public"
  },
  {
    icon: <TbShoppingCartCheck />    ,
    name: 'Presale',
    href: routes.moneyMutt.Presale,
    resource: 'Presale',
    actions: 'Presale.read',
    type: "public"
  },
  {
    icon: <TbDog />    ,
    name: 'Transaction',
    href: routes.moneyMutt.Transaction,
    resource: 'Transaction',
    actions: 'Transaction.read',
   
  },
  {
    icon: <TbLoader3  />    ,
    name: 'Analytics',
    href: routes.moneyMutt.Analtics,
    resource: 'Analytics',
    actions: 'Analytics.read',
    type: "public"
  },
  
  {
    icon: <IoMdSettings/>    ,
    name: 'settings',
    href: routes.moneyMutt.Settings,
    resource: 'settings',
    actions: 'settings.read',
  }
  ,
  {
    icon: <TbTool  />    ,
    name: 'Advanced',
    href: routes.moneyMutt.Advanced,
    resource: 'Advanced',
    actions: 'Advanced.read',
    type: "public"
  },

 
];



// let menuItems
// if (userRoles?.permissions) {
//   menuItems = filterMenuItems(MenuItems, userRoles?.permissions)
// }
// else if (user?.accountType == 'owner') {
//   menuItems = MenuItems
// }

// console.log(menuItems, 'menuItems');


// export { menuItems }


// const permissions = [
//   {
//     "_id": "65fb0667be9d15d89f91c8e2",
//     "resource": "billing",
//     "actions": [
//       "create",
//       "read",
//       "update",
//       "delete"
//     ],
//     "id": "65fb0667be9d15d89f91c8e2"
//   },

// ]


// let menuItems: any = []

// if (role === 'AdministratorRole') {

// } else {
//   menuItems = [
//     {
//       name: 'MANAGE',
//     },
//     {
//       icon: <People />,
//       name: 'Assistants',
//       href: '#',
//     },
//     {
//       icon: <Integration />,
//       name: 'Audiences',
//       href: routes.MoneyMutt.product,
//     },
//     {
//       icon: <Setting />,
//       name: 'Company Settings',
//       href: '#',
//       dropdownItems: [
//         {
//           name: 'Company Details',
//           href: routes.MoneyMutt.companyDetails,
//           badge: '',
//         },
//         {
//           name: 'Team ',
//           href: routes.MoneyMutt.team,
//         },
//         {
//           name: 'billing',
//           href: '/dashboard/profile-settings/billing',
//         },
//       ],
//     },
//     {
//       icon: <Documentation />,
//       name: 'Documentation',
//       href: '#',
//     },
//     {
//       icon: <ApiCommunity />,
//       name: 'API Community',
//       href: '#',
//     },
//   ];
// }


// export { menuItems }


// function filterMenuItems(menuItems, permissions) {
//   const filteredMenuItems = [];

//   // Iterate over each menu item
//   menuItems.forEach(menuItem => {
//     // If the menu item is public, add it directly to filteredMenuItems
//     if (menuItem.type === 'public') {
//       filteredMenuItems.push(menuItem);
//     } else {
//       // If the menu item is not public, check if the user has permission for it
//       if (menuItem.dropdownItems) {
//         // If the menu item has dropdown items, filter them based on permissions
//         const filteredDropdownItems = menuItem.dropdownItems.filter(dropDownItem => {
//           return permissions.some(permission => {
//             return permission.resource === dropDownItem.resource &&
//               permission.actions.includes(dropDownItem.actions[0]);
//           });
//         });
//         // Add the menu item to filteredMenuItems only if at least one dropdown item has permission
//         if (filteredDropdownItems.length > 0) {
//           filteredMenuItems.push({
//             ...menuItem,
//             dropdownItems: filteredDropdownItems
//           });
//         }
//       } else {
//         // If the menu item doesn't have dropdown items, check if the user has permission for it
//         if (permissions.some(permission => {
//           return permission.resource === menuItem.resource &&
//             permission.actions.includes(menuItem.actions);
//         })) {
//           filteredMenuItems.push(menuItem);
//         }
//       }
//     }
//   });

//   return filteredMenuItems;
// }


// const MenuItems = [
//   {
//     icon: '<Documentation />',
//     name: 'Documentation',
//     href: '#',
//     resource: 'documentation',
//     actions: 'documentation.read',
//     type: "public"
//   },
//   {
//     icon: '<Setting />',
//     name: 'Company Settings',
//     href: '#',
//     resource: 'company_settings',
//     dropdownItems: [
//       {
//         name: 'Company Details',
//         href: '/company-details',
//         resource: 'company_details',
//         actions: ['read']
//       },
//       {
//         name: 'Team',
//         href: '/team',
//         resource: 'teams',
//         //     actions: ['create', 'read', 'update', 'delete']
//         actions: ['read']
//       },
//       {
//         name: 'Team',
//         href: '/team/create',
//         resource: 'teams',
//         //     actions: ['create', 'read', 'update', 'delete']
//         actions: ['create']
//       },
//       {
//         name: 'Billing',
//         href: '/billing',
//         resource: 'billing',
//         actions: ['create', 'read', 'update', 'delete']
//       },
//     ]
//   },
// ];

// const permissions = [
//   {
//     "_id": "65fb0667be9d15d89f91c8e2",
//     "resource": "teams",
//     "actions": [
//       "create",
//       "read",
//       "update",
//       "delete"
//     ],
//     "id": "65fb0667be9d15d89f91c8e2"
//   },

// ]


// const filteredMenuItems = filterMenuItems(MenuItems, permissions);
// console.log(filteredMenuItems);
