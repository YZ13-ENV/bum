export const getHost = () => {
    return process.env.VERCEL_ENV === 'development' ? 'http://localhost:3000' : 'https://design.darkmaterial.space'
}