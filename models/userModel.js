module.exports = (sequelize,DataTypes)=>{
    const User = sequelize.define("user",{
        id : {
            type : DataTypes.INTEGER.UNSIGNED,
            primaryKey:true,
            autoIncrement: true
        },
        email:{
            type: DataTypes.STRING
        },
        name:{
            type: DataTypes.STRING
        },
        password:{
            type:DataTypes.STRING
        }
    }, {
        tableName: 'users',
        createdAt: false,
        updatedAt: false,
    })
    return User
}