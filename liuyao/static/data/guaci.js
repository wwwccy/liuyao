// 卦辞数据（中英双语）
// 格式：GUACI[卦名] = { zh: { guaci, baihua, yaoci[] }, en: { guaci, baihua, yaoci[] } }

const GUACI = {
  '乾为天': {
    zh: {
      guaci:  '元亨，利贞。',
      baihua: '大为亨通，适宜守持正道。',
      yaoci: [
        {t:'初九：潜龙，勿用。',                                     b:'阳气潜伏，时机未至，不宜有所作为。'},
        {t:'九二：见龙在田，利见大人。',                              b:'龙出现于田野，利于拜见德高望重之人。'},
        {t:'九三：君子终日乾乾，夕惕若厉，无咎。',                    b:'君子整日奋发，夜晚保持警惕，虽险终无灾害。'},
        {t:'九四：或跃在渊，无咎。',                                  b:'或腾跃或潜伏，无所咎责。'},
        {t:'九五：飞龙在天，利见大人。',                              b:'龙飞升天际，利于拜见大人。'},
        {t:'上九：亢龙有悔。',                                        b:'龙飞升极高，有悔恨之患。'},
      ]
    },
    en: {
      guaci:  'Great success. Persistence furthers.',
      baihua: 'Supreme success through perseverance and righteousness.',
      yaoci: [
        {t:'Line 1: Hidden dragon. Do not act.',                                                                                  b:'The yang force lies dormant. The time is not yet right for action.'},
        {t:'Line 2: Dragon appearing in the field. It furthers to see the great man.',                                            b:'Talent begins to show. Seek guidance from those of high virtue.'},
        {t:'Line 3: The superior man is creative and untiring all day long. At nightfall his mind is still beset with cares.',     b:'Remain diligent and vigilant. Even in difficulty, no fault comes to one who perseveres.'},
        {t:'Line 4: Wavering flight over the depths. No blame.',                                                                  b:'Neither leaping nor retreating brings blame. Feel out the situation.'},
        {t:'Line 5: Flying dragon in the heavens. It furthers to see the great man.',                                             b:'The time of greatness has arrived. Seek out those of high wisdom.'},
        {t:'Line 6: Arrogant dragon will have cause to repent.',                                                                  b:'One who has risen too high invites misfortune. Know your limits.'},
      ]
    }
  }
  // 更多卦辞在此添加 / Add more hexagrams here
};
