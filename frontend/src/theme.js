import { createTheme } from '@mui/material/styles';

const theme = createTheme({
	palette: {
		mode: 'light',
		primary: {
			main: '#1976d2', // A classic blue
		},
		secondary: {
			main: '#dc004e', // A vibrant pink
		},
		background: {
			default: '#f4f6f8',
			paper: '#ffffff',
		},
		text: {
			primary: '#212121',
			secondary: '#757575',
		},
	},
	typography: {
		fontFamily: [
			'Inter',
			'-apple-system',
			'BlinkMacSystemFont',
			'Segoe UI',
			'Roboto',
			'Oxygen',
			'Ubuntu',
			'Cantarell',
			'Fira Sans',
			'Droid Sans',
			'Helvetica Neue',
			'sans-serif',
		].join(','),
		h1: { fontWeight: 700, fontSize: '2.5rem' },
		h2: { fontWeight: 700, fontSize: '2rem' },
		h3: { fontWeight: 700, fontSize: '1.75rem' },
        h4: { fontWeight: 600, fontSize: '1.5rem' },
        h5: { fontWeight: 600, fontSize: '1.25rem' },
        h6: { fontWeight: 600, fontSize: '1rem' },
		button: { textTransform: 'none', fontWeight: 600 },
	},
	shape: {
		borderRadius: 8,
	},
	components: {
		MuiPaper: {
			styleOverrides: {
				root: {
					backgroundImage: 'none',
				},
			},
		},
		MuiLink: {
			styleOverrides: {
				root: { textDecoration: 'none' },
			},
		},
        MuiAppBar: {
            styleOverrides: {
                root: {
                    boxShadow: 'none',
                }
            }
        }
	},
});

export default theme;


