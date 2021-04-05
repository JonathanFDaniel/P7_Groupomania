module.exports = (sequelize, Sequelize) => {
    const Message = sequelize.define("messages", {
/*         idUSERS: {
            type: Sequelize.STRING,
            allowNull: false,
            references: {
                model: 'Users',
                key:'id'
            }
        }, */ 
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