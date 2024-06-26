import { Link } from "@/types/link.type"



export const Collections : Link[] =[
    {
        title : 'Nouveautés',
        href : '#'
    },
    {
        title : 'Meilleures Ventes',
        href : '#'
    },
    {
        title : 'Offres Spéciales',
        href : '/produc'
    },
    {
        title : 'Chaussures de Sport',
        href : '#'
    },
    {
        title : ' Chaussures Formelles',
        href : '#'
    },
    {
        title : 'Chaussures Décontractées',
        href : '#'
    }
]


export const Marks : Link[] = [
    {
        title: 'Chaussures Puma',
        href: '#'
    },
    {
        title: 'Chaussures Asics',
        href: '#'
    },
    {
        title: 'Chaussures Guess',
        href: '#'
    },
    {
        title: 'Chaussures Calvin Klein',
        href: '#'
    },
    {
        title: 'Chaussures Tommyhilfiger',
        href: '#'
    },
    {
        title: 'Chaussures Armani',
        href: '#'
    },
    {
        title: 'Chaussures Boss',
        href: '#'
    },
    {
        title: 'Chaussures Lacost',
        href: '#'
    },
    {
        title: 'Chaussures Timberland',
        href: '#'
    },
    {
        title: 'Chaussures Kaporal',
        href: '#'
    },
    {
        title: 'Chaussures Teddy Smith',
        href: '#'
    }
]



export const supports : Link[] =[
    {
        title : 'Termes',
        href : '#'
    },
    {
        title : 'Confidentialité',
        href : '#'
    },
    {
        title : 'Livraison',
        href : '#'
    },
    {
        title : 'Politique de remboursement',
        href : '#'
    },
    {
        title : 'FAQ',
        href : '#'
    },
    {
        title : 'Contactez-nous',
        href : '#'
    }
]

// Admin

export const adminLink : Link[] =[
    {
        title : 'Dashboard',
        href : '/admin',
        iconName : 'MdOutlineDashboard'
    },
    
    {
        title : 'Produits',
        href : '/admin/products',
        subRoute : ['/admin/products/add', '/admin/products/'],
        iconName : 'AiOutlineProduct'
    },

    {
        title : 'Commandes',
        href : '/admin/orders',
        iconName : 'BsCart2'
    },

    {
        title : 'Utulisateurs',
        href : '/admin/users',
        iconName : 'FiUser'
    },

    {
        title : 'Paramètres',
        href : '/admin/settings',
        iconName : 'IoSettingsOutline'
    }
]
