import { Share2, Twitter, MessageCircle } from 'lucide-react';

export default function SocialShare() {
  const url = typeof window !== 'undefined' ? window.location.href : '';
  const title = '東京都市女性地理表征研究 - 30个街区的欲望地图';

  const share = (platform: string) => {
    const urls: Record<string, string> = {
      twitter: `https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(url)}`,
      line: `https://social-plugins.line.me/lineit/share?url=${encodeURIComponent(url)}`,
      weibo: `https://service.weibo.com/share/share.php?url=${encodeURIComponent(url)}&title=${encodeURIComponent(title)}`,
    };
    window.open(urls[platform], '_blank', 'width=600,height=400');
  };

  const nativeShare = async () => {
    if (navigator.share) {
      await navigator.share({ title, url });
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
