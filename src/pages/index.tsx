import { useState, useEffect } from 'react'
import Head from 'next/head'
import Column from '@/components/atoms/column'
import {
    Box,
    Button,
    Container,
    TextField,
    Typography,
    CircularProgress,
    Alert,
} from '@mui/material'
import useImageGenerator from '../hooks/use-image-generator'
import useMash from '@/hooks/use-mash'
import ArtForm from '@/components/templates/art-form'

export default function Home() {
    return <ArtForm title="Album Art Generator" />
}
