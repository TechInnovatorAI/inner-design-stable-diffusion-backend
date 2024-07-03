import { UserEntity } from 'src/users/entities/user.entity';
import { SENDGRID_HOST_MAIL } from 'src/environments';

export const forgotPassMail = (
  userInfo: UserEntity,
  url: string,
): Promise<boolean> => {
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const sgMail = require('@sendgrid/mail');
  sgMail.setApiKey(process.env.SENDGRID_API_KEY);

  const msg = {
    to: userInfo.email, // Change to your recipient
    from: SENDGRID_HOST_MAIL, // Change to your verified sender
    subject: '【Showcase;AIサービス】パスワード再設定のご連絡',
    text: 'パスワードをリセットするには、下のリンクをクリックしてください',
    html: `<h4>このたびは、”Showcase;AIサービス”にご登録いただきまして
    まことにありがとうございます。</h4>
    <h4>以下の”確認ボタン”をクリックして、パスワードを再設定してください。</h4>
    <div style="margin: 0px 100px">
  <a href="${url}" style="margin: auto; background-color: #666cff; padding: 10px 40px; border-radius: 5px; color: white; text-decoration: none; ">確認する</a>
    </div> 
  <h4>このメールに見覚えがない、当サービスにご登録されていない場合は
  お手数ですが、以下のアドレスまでご報告ください。</h4>
    <a style="text-decoration: none;" href="mailto:info@findshowcase.com">~~~~~~~~~~~~~~~~~info@findshowcase.com~~~~~~~~~~~~~~~~~</a>`,
  };

  return sgMail
    .send(msg)
    .then((response) => {
      console.log(response[0].statusCode);
      console.log(response[0].headers);

      return true;
    })
    .catch((error) => {
      console.error(error);
      return false;
    });
};
