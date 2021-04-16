module.exports = (sequelize, Sequelize) => {
    const Message = sequelize.define("messages", {
 /*        userId: {
            type: Sequelize.INTEGER,
            allowNull: false,
            references: {
                model: 'Users',
                key:'id'
            }
        },   */
        title: {
            type: Sequelize.STRING,
            allowNull: false
        },
        content: {
            type: Sequelize.STRING,
            allowNull: false,
        }
    });
  
    return Message;
  };