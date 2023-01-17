
import { Box } from '@chakra-ui/react';
import React from 'react';
import { GasTankType } from '../../types';

export default function GasTank(props: GasTankType) {
    return (
        <Box>
            {JSON.stringify(props, null, 2)}
        </Box>
    )
}
