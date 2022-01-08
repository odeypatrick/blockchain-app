const Message = require('../../models/chat/message');

//add

exports.addMessage = async (req, res) => {
    const newMessage = new Message(req.body);

    try {
        const savedMessage = await newMessage.save();
        res.status(200).json(savedMessage);
    } catch (err) {
        res.status(500).json(err);
    }
}
//get

exports.getMessages = async (req, res) => {
    try {
        const messages = await Message.find({
          conversationId: req.params.conversationId,
        });
        res.status(200).json(messages);
      } catch (err) {
        res.status(500).json(err);
      }
} 

// Delete
exports.deleteMessage = async (req, res) => {
  Message.findByIdAndDelete(req.params.id).exec()
  .then(data => res.json({ msg: "Message Deleted", data }))
  .catch(err => res.status(500).json(err))
}