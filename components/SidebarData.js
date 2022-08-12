import React from 'react'
import HomeIcon from '@material-ui/icons/Home';
import BusinessIcon from '@material-ui/icons/Business';
import GroupIcon from '@material-ui/icons/Group';
import DescriptionIcon from '@material-ui/icons/Description';
import LocationOnIcon from '@material-ui/icons/LocationOn';

export const SidebarData = [
    {
        title: "Nota fiscal",
        icon: <DescriptionIcon />,
        link: "/nf"
    },
    {
        title: "Outros documentos",
        icon: <BusinessIcon />,
        link: "/outros_documentos"
    }
]