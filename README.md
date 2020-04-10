# yijv
> [MagicMirror](https://github.com/MichMich/MagicMirror) moudle substitute compliments, only supports language.
魔镜模块，取代`'compliments'`，利用[一句](http://yijuzhan.com/) 随机产生一句古诗词。

## Installation
运行以下命令。

```shell
cd modules
git clone https://github.com/jdonge/yijv
```

## Using the module
在 `config/config.js` 文件中替换 compliments 的相关设置：
```js
var config = {
    modules: [
        {
            module: "yijv",
            position: "lower_third",
            config: {
            }
        }
    ]
}
```

### Configuration options
<table width="100%">
	<!-- why, markdown... -->
	<thead>
		<tr>
			<th>Option</th>
			<th width="100%">Description</th>
		</tr>
	<thead>
	<tbody>
		<tr>
			<td><code>updateInterval</code></td>
			<td>更新速度，毫秒。</td>
		</tr>
		<tr>
			<td><code>fadeSpeed</code></td>
			<td>动画速度，毫秒。</td>
		</tr>
		<tr>
			<td><code>url</code></td>
			<td>古诗词来源网址，没事别改。</td>
		</tr>
		<tr>
			<td><code>authorAlign</code></td>
			<td>作者对齐方式<ul>
                <li><code>'align-right'</code> 右对齐。</li>
                <li><code>'align-left'</code> 左对齐。</li>
                <li>空着就居中。</li></ul></td>
		</tr>
		<tr>
        			<td><code>words</code></td>
        			<td>初始语句。</td>
        </tr>
        <tr>
        			<td><code>maxQuantity</code></td>
        			<td>最大缓存数量。</td>
        </tr>
	</tbody>
</table>

#### Example - Global Carousel
```javascript
var config = {
    modules: [
        {
            module: "yijv",
            position: "lower_third",
            config: {
                updateInterval: 60000,
                authorAlign: ""
            }
        }
    ]
}
```
