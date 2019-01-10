## 在米家扩展程序中使用自定义字体

1. 我们推荐使用系统自带字体，维护成本最低，避免版权、迁移等等问题。如必须使用其他字体，参考下一条。

2. 米家目前支持以下字体，请从中选择。

   - D-DIN
   - D-DINCondensed-Bold
   - D-DINCondensed
   - D-DINExp-Bold
   - Kmedium
   - DS-Digital
   - MI-LANTING--GBK1-Light
   - MI-LANTING--GBK1-Thin

3. 以上字体直接在 Style 中直接使用 `fontFamily` 调用即可。
    ```
        <Text style={{fontFamily:'MI-LANTING--GBK1-Light'}}> 您想要展示的文字  </Text>
    ```

4. 考虑版权问题与维护成本，不接受其他字体。

   ​