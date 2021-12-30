const func = async (hre) => {
	const { deployments, getNamedAccounts } = hre;
	const { deploy } = deployments;
	const { deployer } = await getNamedAccounts();

	const name = 'NFT';

	await deploy('NFT', {
		from: deployer,
		log: true,
	});
};

func.tags = ['NFT'];
module.exports = func;