import jwt from "jsonwebtoken";


export const authMiddleware = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  if(!authHeader){
    return res.status(401).json({ error: "Token não fornecido"});
  }

  const token = authHeader.substring(7);
  try{
    const decoded = jwt.verify(token, process.env.TOKEN_SECRET);

    req.user = {
      id: decoded.id,
      email: decoded.email
    };

    next();
  }catch (error){
    return res.status(401).json({mensagem: "Token invalido", erro: error});
  }
};