module.exports = (sequelize, Sequelize) => {
    const Like = sequelize.define("likes", {
        userId: {
            type: Sequelize.INTEGER,
            allowNull: false,
            references: {
                model: 'Users',
                key:'id'
            }
        },  
        messageId: {
            type: Sequelize.INTEGER,
            allowNull: false,
            references: {
                model: 'Messages',
                key:'id'
            }
        },
        isLike: {
            allowNull: false,
            type: Sequelize.INTEGER   
        }
    });
  
    return Like;
  };