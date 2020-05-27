/**
 * 获取当前值在给定范围中的占比
 * @param  {[Number]} value     [当前值，默认为0]
 * @param  {[Number]} min       [最小值，默认为0]
 * @param  {[Number]} max       [最大值，默认为1]
 * @param  {[Number]} targetMin [目标最小值，默认为0]
 * @param  {[Number]} targetMax [目标最大值，默认为1]
 * @return {[Number]}           [给定范围中的占比]]
 */
export default function getPercent(value = 0, min = 0, max = 1, targetMin = 0, targetMax = 1) {
  if (min >= max || targetMin >= targetMax || value >= max) {
    return targetMax;
  }
  if (value <= min) {
    return targetMin;
  }
  return (value - min) / (max - min) * (targetMax - targetMin) + targetMin;
}
