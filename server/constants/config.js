const corsOptions = {
    origin: [
      "https://convo-net.vercel.app",
      "http://localhost:3001",
      "http://localhost:3000",
      process.env.CLIENT_URL,
    ],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
    Headers: true,
    exposedHeaders: 'Set-Cookie',
    allowedHeaders: [
      'Access-Control-Allow-Origin',
      'Content-Type',
      'Authorization'
    ]
  };
  
  const TOKEN = "token";
  
  export { corsOptions, TOKEN };