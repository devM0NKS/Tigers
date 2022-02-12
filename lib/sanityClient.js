import sanityClient from '@sanity/client'

export const client = sanityClient({
  projectId: 'dz7d5iuo',
  dataset: 'production',
  apiVersion: '2021-03-25',
  token:
    'skE8nasyPeM9x6gaZYlfx0mfg6c4ypgRnGiKjKYW4jaQi4On0JlYM2K6v5akxVoSjBnpGKAvd29UeFX38R0pvlkaLx0GVTvHDMkMjszHuaRdPiT9Vnwvw4URbxNM3vBlI0X3jpz9VaGDpGp9LGcDXpAC1dm9yiH8QpO844qrBPFaXeEMwqz0',
  useCdn: false,
})
