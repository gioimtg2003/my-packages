export function bypassCaptcha(svg: string): string | number {
  const model: { [key: string]: number } = {
    MCLCLCLCLCLCCLCLCLCLCLCLCCLCLCLCLCCLCLCLCLCCZMCCLCLCCLCLCCLCLCCLCZ: 0,
    MLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLZ: 1,
    MLLLLLLLLLLLLCLCLCCLCLCLLLLLLLLLLLLLLLLLLLLLLLLLLLLLZ: 2,
    MCLCCLCLCCLCLCLLLLLLLLLLLCCCCCLLLLLLLLLLLLCCCCCCCCLLLLLCCCLCCLCCLCLCCZ: 3,
    MLLLLLLLLLLLLLLLLLCLCLCCLCLCLLLLLLLLLLLLLLLLLLLLLLLLLZMLLLLLLLLLLLLLLLZMLLLZ: 4,
    MCLCLCLCLCLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLCCLLLLLLLCLCLCZ: 5,
    MCLCLCLCLCCCLCLCLCLCLCLCLCLCLCLCLCLCLCLCLCLCCLCLCZMLCCCCLCLCCLCZ: 6,
    MLCLCCLCLCLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLCZ: 7,
    MCLCLCLCCLCCLCLCLCLCCLCLCLCLCCLCCLCLCLCCLCLCCLCLCZMLCLCCCCLCZMLCCLCLCCCCLCZ: 8,
    MLCLCLCLCLCLCCLCLCLCLCCLCLCLCLCCCCCLCLCLCLCLCLCLCLCZMLCCCCCLCLCCCCLCZ: 9,
  };

  const chars: { [key: number]: number } = {};
  const matches = [...svg.matchAll(/<path fill="(.*?)" d="(.*?)"\s*\/>/g)];

  if (matches.length !== 6) {
    return matches.length;
  }

  const paths = matches.map(match => match[2]);
  paths.forEach(path => {
    const p = path.match(/M([0-9]+)/);
    if (p) {
      const pattern = path.replace(/[0-9 \\.]/g, '');
      chars[parseInt(p[1])] = model[pattern];
    }
  });

  const sortedKeys = Object.keys(chars).sort(
    (a, b) => parseInt(a) - parseInt(b),
  );
  return sortedKeys.map(key => chars[parseInt(key)]).join('');
}
