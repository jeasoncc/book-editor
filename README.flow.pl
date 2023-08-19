use Graph::Easy;

# 创建 Graph::Easy 对象
my $ge = Graph::Easy->new();

# 添加节点
my $node0 = $ge->add_node('Typescript');
my $node1 = $ge->add_node('Sevelte');
my $node2 = $ge->add_node('LocalForge');
my $node3 = $ge->add_node('Electron');
my $node4 = $ge->add_node('BookEditor');

# 添加边
$ge->add_edge($node0, $node4);
$ge->add_edge($node1, $node4);
$ge->add_edge($node2, $node4);
$ge->add_edge($node3, $node4);

# 绘制图形并输出
print $ge->as_ascii();


