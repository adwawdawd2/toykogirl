import { Share2, Twitter, MessageCircle } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

export default function SocialShare() {
  const url = typeof window !== 'undefined' ? window.location.href : '';
  const title = '東京都市女性地理表征研究 - 30个街区的欲望地图';

  const share = (platform: string) => {
    const urls: Record<string, string> = {
      twitter: `https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(url)}`,
      line: `https://social-plugins.line.me/lineit/share?url=${encodeURIComponent(url)}`,
      weibo: `https://service.weibo.com/share/share.php?url=${encodeURIComponent(url)}&title=${encodeURIComponent(title)}`,
    };

    const shareUrl = urls[platform];

    if (!shareUrl) {
      console.warn(`[SocialShare] Unsupported platform: ${platform}`);
      return;
    }

    const popup = window.open(shareUrl, '_blank', 'noopener,noreferrer,width=600,height=400');

    if (!popup) {
      toast({
        title: '无法打开分享窗口',
        description: '请允许弹出窗口后重试，或使用浏览器原生分享。',
      });
    }
  };

  const nativeShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({ title, url });
      } catch (error) {
        const isUserCancelled =
          (error instanceof DOMException && error.name === 'AbortError') ||
          (error instanceof Error && /cancel|canceled|aborted|用户取消|取消分享/i.test(error.message));

        if (isUserCancelled) {
          return;
        }

        toast({
          title: '分享失败',
          description: '请稍后重试，或使用下方平台按钮分享。',
        });
      }
    }
  };

  return (
    <footer className="py-12 border-t border-border" id="share">
      <div className="max-w-3xl mx-auto px-4 text-center">
        <p className="text-sm text-muted-foreground mb-4">分享这份研究</p>
        <div className="flex gap-3 justify-center">
          <button onClick={() => share('twitter')} className="p-3 rounded-full bg-secondary hover:bg-secondary/80 text-foreground transition-colors" aria-label="Share on Twitter">
            <Twitter className="w-5 h-5" />
          </button>
          <button onClick={() => share('line')} className="p-3 rounded-full bg-secondary hover:bg-secondary/80 text-foreground transition-colors" aria-label="Share on LINE">
            <MessageCircle className="w-5 h-5" />
          </button>
          <button onClick={nativeShare} className="p-3 rounded-full bg-secondary hover:bg-secondary/80 text-foreground transition-colors" aria-label="Share">
            <Share2 className="w-5 h-5" />
          </button>
        </div>
        <p className="mt-8 text-xs text-muted-foreground/50">
          東京都市女性地理表征与社会分层刻板印象深度研究报告
        </p>
      </div>
    </footer>
  );
}
