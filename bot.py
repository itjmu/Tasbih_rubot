from telegram import Update
   from telegram.ext import Updater, CommandHandler, CallbackContext

   def start(update: Update, context: CallbackContext):
       update.message.reply_text(
           "📿 Ваш Тасбих-счётчик: https://itjmu.github.io/Tasbih_rubot/"
       )

   def main():
       updater = Updater("6902588751:AAFCTn3Dhf43TaPJsGclIDfIBPAsmpQJWzg")
       dispatcher = updater.dispatcher
       dispatcher.add_handler(CommandHandler('start', start))
       updater.start_polling()
       updater.idle()

   if __name__ == "__main__":
       main()
