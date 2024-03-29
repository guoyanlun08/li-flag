/**
 * 文字复制粘贴hook
 */
export default function useClipboard() {
  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
    } catch (err) {
      console.error('复制失败');
    }
  };

  return {
    copyToClipboard
  };
}
