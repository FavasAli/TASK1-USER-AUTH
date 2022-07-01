import JWT from 'jsonwebtoken'

const generatetoken=(id)=>{
    return JWT.sign({id},process.env.PRIVATE_KEY,{
        expiresIn:'30d'
    })
}

export default generatetoken