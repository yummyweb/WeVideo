const func = async (hre) => {
	const { deployments, getNamedAccounts } = hre;
	const { deploy } = deployments;
	const { deployer } = await getNamedAccounts();

	const name = 'Contract';

	await deploy('Contract', {
		from: deployer,
		log: true,
	});
};

func.tags = ['Contract'];
module.exports = func;